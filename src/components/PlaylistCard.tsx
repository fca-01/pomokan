import Image from "next/image";
import { Play, BookmarkPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PlaylistCardProps {
  name: string;
  description: string;
  imageUrl: string;
  onSelect: () => void;
  onSave?: () => void;
  onRemove?: () => void;
  isSaved: boolean;
}

export function PlaylistCard({
  name,
  description,
  imageUrl,
  onSelect,
  onSave,
  onRemove,
  isSaved,
}: PlaylistCardProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="group relative bg-gray-800/80 rounded-lg p-3 transition-all duration-300 hover:bg-gray-700/90 cursor-pointer border border-gray-700/50 hover:border-gray-600 shadow-lg hover:shadow-xl">
        <div
          className="relative aspect-square mb-3 overflow-hidden rounded-md"
          onClick={onSelect}
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg size-6 text-sm"
              >
                <Play className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Play playlist</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <h3 className="font-semibold text-sm text-gray-100 mb-0.5 truncate">
          {name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 leading-snug">
          {description}
        </p>
        {isSaved ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-red-400 size-6 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onRemove) onRemove();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove from library</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-green-400 size-8 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSave) onSave();
                }}
              >
                <BookmarkPlus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save to library</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
