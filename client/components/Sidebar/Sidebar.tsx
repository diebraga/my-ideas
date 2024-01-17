import React from "react";
import {
  IconButton,
  List,
  ListItem,
  Drawer,
  Card,
  Button,
} from "@material-tailwind/react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Logo from "../Logo/Logo";
import { navigation } from "@/utils/constants/navigation";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const router = useRouter();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = (link?: string) => {
    if (link) router.push(link);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <IconButton
        className="items-center md:hidden flex"
        variant="text"
        size="lg"
        onClick={openDrawer}
      >
        {isDrawerOpen ? (
          <IoMdClose className="h-8 w-8 stroke-2" />
        ) : (
          <IoMdMenu className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="bg-white">
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4 z-50"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Logo />
          </div>
          <List>
            <hr className="my-2 border-blue-gray-50" />
            {navigation.map((item) => (
              <ListItem key={item.href} onClick={() => closeDrawer(item.href)}>
                {item.title}
              </ListItem>
            ))}
            <ListItem>
              <Button onClick={() => closeDrawer()} className="w-full">
                Close
              </Button>
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
};
