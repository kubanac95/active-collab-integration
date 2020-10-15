const enum EventType {
  NEW_TASK = "NEW_TASK",
  NEW_TIME_ENTRY = "NEW_TIME_ENTRY",
  TIME_ENTRY_DELETED = "TIME_ENTRY_DELETED",
  TIME_ENTRY_UPDATED = "TIME_ENTRY_UPDATED",
  NEW_TIMER_STARTED = "NEW_TIMER_STARTED",
  TIMER_STOPPED = "TIMER_STOPPED",
}

enum UserStatus {
  ACTIVE = "ACTIVE",
}

enum TaskStatus {
  ACTIVE = "ACTIVE",
}

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

interface Event {
  id: string;
  description: string;
  userId: string;
  billable: boolean;
  projectId: string;
  timeInterval: TimeInterval;
  workspaceId: string;
  project?: Project;
  task?: Task;
  user: User;
  tags: Array<EventTag>;
}
