const Svg = ({ svgData = "", ...props }) => {
  return (
    <div className="flex" dangerouslySetInnerHTML={{ __html: svgData || "" }} {...props} />
  );
};

export default Svg;
