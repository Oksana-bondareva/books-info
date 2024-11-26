import { ReactNode } from "react";

export interface Book {
    index: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
}

export interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
}

export interface LanguageProviderProps {
    children: ReactNode;
}