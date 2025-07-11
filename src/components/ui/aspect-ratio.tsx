import React from 'react';
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio({
  ...props
}) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio }

export default Component;