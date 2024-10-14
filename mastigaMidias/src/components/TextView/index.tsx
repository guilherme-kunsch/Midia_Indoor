import API from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Parser } from "html-to-react";
interface TextViewProps {
    id: string
    className?:string
}
export default function TextView({id, className}: TextViewProps) {
  const parser= Parser()
  const fetchText = async (id: string) =>  {
    const response = await new API().get("/html/" + id)
    if(response.status === 200) {
      const data = response.data
      return data
    }
  }
  const {data} = useQuery({queryKey: ["text-" + id], queryFn: () => fetchText(id)})

  return (
    <div className={className} >
      {parser.parse(data)}
    </div>
  )
}
