import React from "react";
import { Badge } from "@/components/ui/badge";

type CategoryBadgeProps = {
  tags: string[];
};

const CategoryBadge = ({ tags }: CategoryBadgeProps) => {
  return (
    <div className="flex space-x-2">
      {
        tags.map((tag) => (
          <Badge key={tag} variant="primary" className="uppercase">
            {tag}
          </Badge>
        ))
      }
    </div>
  );
};

export default CategoryBadge;
