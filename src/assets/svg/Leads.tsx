import * as React from 'react';
import Svg, { SvgProps, G, Path, Circle } from 'react-native-svg';

function LeadsIcon(props: SvgProps) {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 24 24" {...props}>
            <G fill="none" fillRule="evenodd">
                <Path d="M0 0h24v24H0z" />
                <Path
                    stroke="#64728C"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 18.5l-1 3m16-3l1 3"
                />
                <Path
                    fill="#64728C"
                    d="M12 7a5 5 0 11-.001 10.001A5 5 0 0112 7zm0 4a1 1 0 100 2 1 1 0 000-2z"
                    opacity={0.2}
                />
                <Circle cx={12} cy={12} r={9.5} stroke="#64728C" />
                <Circle cx={12} cy={12} r={5.5} stroke="#64728C" />
                <Circle cx={12} cy={12} r={1.5} stroke="#64728C" />
            </G>
        </Svg>
    );
}

export default LeadsIcon;
