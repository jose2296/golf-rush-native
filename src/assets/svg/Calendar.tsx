import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

function CalendarIcon(props: SvgProps) {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 24 24" {...props}>
            <G fill="none" fillRule="evenodd">
                <Path d="M0 0h24v24H0z" />
                <Path
                    fill="#64728C"
                    fillRule="nonzero"
                    d="M7 3v1H4.5C3.676 4 3 4.676 3 5.5v14c0 .824.676 1.5 1.5 1.5h15c.824 0 1.5-.676 1.5-1.5v-14c0-.824-.676-1.5-1.5-1.5H17V3h-1v1H8V3H7zM4.5 5H7v2h1V5h8v2h1V5h2.5c.281 0 .5.219.5.5V9H4V5.5c0-.281.219-.5.5-.5zM4 10h16v9.5c0 .281-.219.5-.5.5h-15a.494.494 0 01-.5-.5V10z"
                />
                <Path
                    fill="#64728C"
                    fillRule="nonzero"
                    d="M4.5 5H7v2h1V5h8v2h1V5h2.5c.281 0 .5.219.5.5V9H4V5.5c0-.281.219-.5.5-.5z"
                    opacity={0.2}
                />
            </G>
        </Svg>
    );
}

export default CalendarIcon;
