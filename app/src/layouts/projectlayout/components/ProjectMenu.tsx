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
import { Link } from "react-router-dom"
  
  
  export default function ProjectMenu() {
	return (
		  <Sidebar>
			  <SidebarContent>
				  <SidebarGroup className="pt-16">
  
					  <SidebarGroupLabel>Project Menu</SidebarGroupLabel>
  
					  <SidebarGroupContent >
  
						  <SidebarMenu>

								<SidebarMenuItem>
										<Link to="#">

									<SidebarMenuButton>


											<Table/>
											Files Table



									</SidebarMenuButton>
										</Link>

										<Link to="#">
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
  