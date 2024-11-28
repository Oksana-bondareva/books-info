import { ReactNode } from "react";

export interface Review {
    name: string;
    review: string;
}

export interface Book {
    index: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    reviews: Review[];
    likes: number;
}

export interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
}

export interface LanguageProviderProps {
    children: ReactNode;
}

export interface BookCoverProps {
    title: string;
    author: string;
}