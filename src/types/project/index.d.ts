type TProject = {
  id: number;
  class: "Project";
};

type TUser = {
  id: number;
  class: "Member";
  url_path: string;
};

type TResponseDocument<T> = {
  single: T;
};

type TResponseCollection<T> = Array<T>;
