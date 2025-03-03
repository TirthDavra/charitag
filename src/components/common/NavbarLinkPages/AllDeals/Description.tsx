import React from "react";
import Heading from "../../Heading";

export interface DescriptionProps {
  className: string;
  classNameHeading: string;
  classNamePara: string;
}

const Description: React.FC<DescriptionProps> = ({
  className,
  classNameHeading,
  classNamePara,
}) => {
  return (
    <div className={className}>
      <div>
        <Heading
          content={"Lorem ipsum dolor sit amet consectetur."}
          varient="4xl"
          className={classNameHeading}
          required={false}
        />
      </div>
      <div>
        <Heading
          className={classNamePara}
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus temporibus nobis officia dignissimos eveniet aspernatur perferendis ducimus ullam ipsam soluta!"
          varient="lg"
          required={false}
        />
      </div>
    </div>
  );
};

export default Description;
