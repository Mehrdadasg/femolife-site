export type FeaturesItem = {
  Id: number;
  Title: string;
  Text: string;
  ImageUrl: string;
};

export type Article = {
  Id: number;
  Title: string | null;
  Text: string | null;
  ImageUrl: string | null;
  CategoryTitle: string | null;
  ReadTime: string | null;
  Slug: string | null;
};

export type MenuItems = {
  Id: number;
  Title: string;
  Url: string;
};

export type MenuType = {
  menuItems: MenuItems[];
};

export type BlogListHeaderType = {
  page: number;
  category?: string | null;
  searchKey?: string | null;
  authorSlug?:string|null
};

export type Blog = Article & {
  PublishDate: string | null;
  AuthorName: string | null;
  AuthorAvatar: string | null;
  AuthorSlug: string | null;
};

export type HorizontalArticle = Blog & {
  VisitedCount: number;
  CommentCount: number;
  Rate: number;
};

export type BlogListResponse = {
  Data: {
    Items: Blog[];
    RecordeCount: number;
    PageCount: number;
    PageSize:number
  };
};

export type CategoryType = {
  Id: number;
  Title: string;
  Slug: string;
};

export interface BlogContent {
  Id: number;
  Title: string;
  Text: string;
  ImageUrl: string;
  CategoryTitle: string;
  ReadTime: string;
  Slug: string;
  PublishDate: string;
  AuthorName: string;
  AuthorAvatar: string;
  AuthorSlug: string;
  VisitedCount: number;
  CommentCount: number;
  Rate: number;
}

export interface BlogPost {
  Id: number;
  Title: string | null;
  Text: string | null;
  ImageUrl: string | null;
  CategoryTitle: string | null;
  ReadTime: string | null;
  Slug: string | null;
  PublishDate: string | null;
  AuthorName: string | null;
  AuthorAvatar: string | null;
  AuthorSlug: string | null;
  VisitedCount: number;
  CommentCount: number;
  Rate: number;
}

export interface Seo {
  Id: number;
  MetaTitle: string | null;
  MetaDescription: string | null;
  CanonicalUrl: string | null;
  OgTitle: string | null;
  OgDescription: string | null;
  OgImageUrl: string | null;
  OgUrl: string | null;
  JsonLd: null;
}

export interface BlogSource {
  Id: number;
  Title: string;
  Url: string;
}

export interface BlogHeading {
  Title: string;
  Id: string;
}

export interface BlogDetails {
  Content: BlogContent;
  Next: BlogPost;
  Prev: BlogPost;
  Seo: Seo;
  Sources: BlogSource[];
  Headings: BlogHeading[];
}

export interface CommentItem {
  Avatar: string;
  Id: number;
  Text: string;
}

export interface Comment {
  Avatar: string;
  Id: number;
  Text: string;
  Name:string;
  CreateDate:string
  Childs: CommentItem[];
}

export type CommentListResponse = {
  Data: Comment[];
  Message: string | null;
};

export type FormProps = {
  comment: string;
  name: string;
  email: string;
};

export type ContactFormProps = {
  comment: string;
  name: string;
  phone: string;
};

export interface AddComment {
  Slug: string;
  Name: string;
  Text: string;
  Email: string;
}

export interface AddMessage {
  Name: string;
  Text: string;
  Phone: string;
}

export interface ExpertType {
  Id: number;
  Title: string;
  SubTitle: string;
  CategoryId: number;
  Avatar: string;
  Slug: string;
}

export interface ExpertContent {
  Id: number;
  Title: string;
  SubTitle: string;
  Text: string;
  Phone: string;
  Address: string;
  Instagram: string;
  ImageUrl: string;
  MedicalNumber: string; 
  Skills: string;
  Experience: string;
  WithUs: string;
}

export interface ExpertInfo {
  Content: ExpertContent;
  Seo: Seo;
}

export interface Member {
  Title: string;
  SubTitle: string;
  ImageUrl: string;
  Github: string | null;
  Linkedin: string | null;
}
