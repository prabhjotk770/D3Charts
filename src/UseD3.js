import React from "react";
import * as d3 from "d3";

export const useD3 = (renderChartFn, dependencies) => {
  const refs = React.useRef();

  React.useEffect(() => {
    renderChartFn(d3.select(refs.current));
  }, [dependencies]);
  return refs;
};
