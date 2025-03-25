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
} from "../ui/sidebar";
import { useNavigate } from "react-router";
const data = {
  navMain: [
    {
      title: "Team Space",
      url: "#",
      items: [
        {
          title: "Team Board",
          icon: Presentation,
          url: "/team-board",
        },
        {
          title: "Progress Tracker",
          icon: LoaderCircle,
          url: "/progress-tracker",
        },
        {
          title: "ChatRoom",
          icon: MessageSquare,
          url: "/chat-room",
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
          url: "/home",
        },
      ],
    },
  ],
};

export default function SidebarGroups() {
  const navigate = useNavigate();
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
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => {
                      navigate(item.url);
                    }}
                  >
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
