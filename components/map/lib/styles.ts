export const ZOOM = 12;

export const autoCompleteStyle = {
  boxSizing: `border-box` as const,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: 'absolute' as const,
  left: '50%',
  marginLeft: '-120px',
};

export const containerStyle = {
  width: '900px',
  height: '600px',
};
