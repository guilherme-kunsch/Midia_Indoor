
import { Parser } from "html-to-react";

interface TextViewProps {
    className?: string;
    content: string
}


export default function TextView({className, content }: TextViewProps) {
    const parser = Parser();
    return <div className={className}>{parser.parse(content)}</div>;
}
