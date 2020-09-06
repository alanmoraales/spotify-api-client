import { FunctionComponent } from "react";
import MediaCardDisplay from "./MediaCardDisplay";

interface IProps {
  uri: string;
  imageURL: string;
  title: string;
  description: string;
}

export const MediaCard: FunctionComponent<IProps> = ({
  uri,
  imageURL,
  title,
  description,
}) => {
  const action = () => {
    alert(`Reproduciendo: ${uri}`);
  };

  return (
    <MediaCardDisplay
      imageURL={imageURL}
      title={title}
      description={description}
      action={action}
    />
  );
};
