import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const MenuIcon = (props: SvgProps) => (
    <Svg viewBox="0 0 50 50" {...props}>
        <Path d="M5 8a2 2 0 1 0 0 4h40a2 2 0 1 0 0-4H5zm0 15a2 2 0 1 0 0 4h40a2 2 0 1 0 0-4H5zm0 15a2 2 0 1 0 0 4h40a2 2 0 1 0 0-4H5z" />
    </Svg>
);

export default MenuIcon;
