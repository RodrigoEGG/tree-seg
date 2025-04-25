import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Map, Table } from "lucide-react"
import { Link, useParams } from "react-router-dom"
  
  
  export default function ProjectMenu() {
	const {id} = useParams();
	return (
		  <Sidebar>
			  <SidebarContent>
				  <SidebarGroup className="pt-16">
  
					  <SidebarGroupLabel>Project Menu</SidebarGroupLabel>
  
					  <SidebarGroupContent >
  
						  <SidebarMenu>

								<SidebarMenuItem>

									<Link to={`/app/project/files/${id}`}>

										<SidebarMenuButton>


												<Table/>
												Files Table



										</SidebarMenuButton>

									</Link>

									<Link to={`/app/project/map/${id}`}>

										<SidebarMenuButton>


												<Map/>
												Map


										</SidebarMenuButton>

									</Link>

								</SidebarMenuItem>
  
  
						  </SidebarMenu>
  
					  </SidebarGroupContent>
  
				  </SidebarGroup>
  
  
			  </SidebarContent>
  
		  </Sidebar>
	  )
  }
  