import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { Parser } from "html-to-react";
export default function TextView({id}) {
  const parser= Parser()
  const fetchText = async (id) =>  {
    const response = await api.get("/html/" + id)
    if(response.status === 200) {
      const data = response.data
      return data 
    }
  }
  const {data} = useQuery({queryKey: ["text-" + id], queryFn: () => fetchText(id)})
  
  return (
    <div >
      {parser.parse(data)}
    </div>
  )
}