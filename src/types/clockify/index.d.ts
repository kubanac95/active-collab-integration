type EventType =
  | "NEW_TASK"
  | "NEW_TIME_ENTRY"
  | "TIME_ENTRY_DELETED"
  | "TIME_ENTRY_UPDATED";

type UserStatus = "ACTIVE";

type TaskStatus = "ACTIVE" | "DONE";

interface Project {
  id: string;
  name: string;
  clientId: string;
  workspaceId: string;
  billable: boolean;
}

interface Task {
  id: string;
  projectId: string;
  workspaceId: string;
  name: string;
  status: TaskStatus;
}

interface User {
  id: string;
  name: string;
  status: UserStatus;
}

interface TimeInterval {
  start: string;
  end: string;
  duration: string;
}

interface EventTag {
  name: string;
}

interface EventTimeEntry {
  id: string;
  description: string;
  userId: string;
  billable: boolean;
  projectId: string;
  timeInterval: TimeInterval;
  isLocked: boolean;
  hourlyRate: null | unknown;
  costRate: null | unknown;
  customFieldValues: unknown[];
  workspaceId: string;
  project?: Project;
  task?: Task;
  user: User;
  tags: EventTag[];
}

interface TimeEntry {
  id: string;
  /**
   * If provided, time entries will be filtered by description.
   */
  description: string;
}

interface EventNewTask {
  id: string;
  name: string;
  projectId: string;
  assigneeIds: string[];
  assigneeId: string;
  estimate: string;
  status: TaskStatus;
  duration: string;
  billable: boolean;
  hourlyRate: unknown;
  costRate: unknown;
}
