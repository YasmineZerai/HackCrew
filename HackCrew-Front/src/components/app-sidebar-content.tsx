import {
  Bot,
  LoaderCircle,
  MessageSquare,
  Presentation,
  User,
  Users,
} from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
const data = {
  navMain: [
    {
      title: "Team Space",
      url: "#",
      items: [
        {
          title: "Team Board",
          icon: Presentation,
          url: "#",
        },
        {
          title: "Progress Tracker",
          icon: LoaderCircle,
          url: "#",
        },
        {
          title: "members",
          icon: Users,
          url: "#",
        },
        {
          title: "ChatRoom",
          icon: MessageSquare,
          url: "#",
        },
      ],
    },
    {
      title: "Personnal space",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "My Workspace",
          icon: User,
          url: "#",
        },
      ],
    },
  ],
};

export default function SidebarGroups() {
  return (
    <SidebarContent>
      {data.navMain.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel className="text-gray-600 gap-1">
            {item.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title} className="text-white">
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
