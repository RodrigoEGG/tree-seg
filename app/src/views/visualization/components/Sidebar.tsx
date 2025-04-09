
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"

import ForestVisualizationMenu from "./ForestVisualizationMenu"
import Metrics from "./Metrics"

export default function Forestmenu() {
  return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>

					<SidebarGroupLabel>Application</SidebarGroupLabel>

					<SidebarGroupContent className="pt-5">

						<SidebarMenu>

							<ForestVisualizationMenu/>

						</SidebarMenu>

					</SidebarGroupContent>

				</SidebarGroup>

				<Metrics/>

			</SidebarContent>

		</Sidebar>
	)
}
