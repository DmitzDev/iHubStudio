import type { IAnnouncementRepository } from './interfaces/IAnnouncementRepository.js';
import type { IApplicationRepository } from './interfaces/IApplicationRepository.js';
import type { IEventRepository } from './interfaces/IEventRepository.js';
import type { IMemberRepository } from './interfaces/IMemberRepository.js';
import type { IProjectRepository } from './interfaces/IProjectRepository.js';
import type { IUserRepository } from './interfaces/IUserRepository.js';
import { MemoryAnnouncementRepository } from './memory/MemoryAnnouncementRepository.js';
import { MemoryApplicationRepository } from './memory/MemoryApplicationRepository.js';
import { MemoryEventRepository } from './memory/MemoryEventRepository.js';
import { MemoryMemberRepository } from './memory/MemoryMemberRepository.js';
import { MemoryProjectRepository } from './memory/MemoryProjectRepository.js';
import { MemoryUserRepository } from './memory/MemoryUserRepository.js';

/**
 * Composition root for repositories.
 * Swap any Memory*Repository with a database-backed implementation here
 * without touching services, controllers, or frontend code.
 */
export const repositories: {
  projects: IProjectRepository;
  events: IEventRepository;
  members: IMemberRepository;
  announcements: IAnnouncementRepository;
  applications: IApplicationRepository;
  users: IUserRepository;
} = {
  projects: new MemoryProjectRepository(),
  events: new MemoryEventRepository(),
  members: new MemoryMemberRepository(),
  announcements: new MemoryAnnouncementRepository(),
  applications: new MemoryApplicationRepository(),
  users: new MemoryUserRepository(),
};
