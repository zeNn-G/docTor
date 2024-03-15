import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { insertJsx$, usePublisher } from "@mdxeditor/editor";
import { Button } from "../ui/button";

type Props = {};

const ComponentSelector = (props: Props) => {
  const insertJsx = usePublisher(insertJsx$);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Components</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            insertJsx({
              name: "MyLeaf",
              kind: "flow",
              props: {},
            });
          }}
        >
          MyLeaf
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ComponentSelector;
