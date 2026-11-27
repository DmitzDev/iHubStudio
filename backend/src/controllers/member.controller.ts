import type { NextFunction, Request, Response } from 'express';
import type {
  ApiSuccessResponse,
  CreateMemberInput,
  Member,
  MemberCommittee,
  MemberFilter,
} from '@ihub/shared';
import { memberService } from '../services/member.service.js';

export async function listMembers(
  req: Request,
  res: Response<ApiSuccessResponse<Member[]>>,
  next: NextFunction
): Promise<void> {
  try {
    const filter: MemberFilter = {};
    if (typeof req.query.committee === 'string' && req.query.committee.length > 0) {
      filter.committee = req.query.committee as MemberCommittee;
    }

    const members = await memberService.listMembers(filter);

    res.json({
      success: true,
      data: members,
      meta: { total: members.length },
    });
  } catch (err) {
    next(err);
  }
}

export async function createMember(
  req: Request<unknown, unknown, CreateMemberInput>,
  res: Response<ApiSuccessResponse<Member>>,
  next: NextFunction
): Promise<void> {
  try {
    const member = await memberService.createMember(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
}

export async function deleteMember(
  req: Request<{ id: string }>,
  res: Response<ApiSuccessResponse<{ deleted: boolean }>>,
  next: NextFunction
): Promise<void> {
  try {
    await memberService.deleteMember(req.params.id);
    res.json({ success: true, data: { deleted: true } });
  } catch (err) {
    next(err);
  }
}
