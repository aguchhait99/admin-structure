declare module 'react-quill-new' {
    import React from 'react';
    export interface ReactQuillProps {
        theme?: string;
        modules?: any;
        formats?: string[];
        value?: string;
        onChange?: (value: string) => void;
        placeholder?: string;
        readOnly?: boolean;
        className?: string;
    }
    export default class ReactQuill extends React.Component<ReactQuillProps> { }
}
