import React from 'react';
import Svg, { Path } from "react-native-svg";

const HouseIcon = (props: { fill?: string }) => {
    return (
        <Svg viewBox="0 0 511.925 511.925">
            <Path fill={ props.fill || '#000000' } d="M430.772 276.2v191.784c0 8.324-6.771 15.096-15.096 15.096h-11.63c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h11.63c16.595 0 30.096-13.501 30.096-30.096v-176.17l15.266 15.891c6.894 7.176 18.337 7.298 25.381.254l20.338-20.339c6.792-6.79 6.904-17.95.25-24.877L276.185 22.464c-11.035-11.487-29.402-11.497-40.445 0L4.917 262.743c-6.653 6.926-6.541 18.086.25 24.877l20.339 20.339c7.038 7.036 18.479 6.93 25.382-.254l15.264-15.889v36.432c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-52.047L250.26 100.163a7.902 7.902 0 0111.404 0L430.772 276.2zm65.378.812l-20.339 20.34c-1.33 1.095-2.649 1.082-3.957-.04L272.482 89.773l-.002-.002-.031-.031c-9.023-9.358-23.99-9.354-33.006.032l-171.2 178.213-.011.013-28.161 29.314c-1.308 1.122-2.628 1.135-3.958.039l-20.339-20.339a2.785 2.785 0 01-.039-3.878L246.557 32.855c5.139-5.349 13.674-5.348 18.811.001l230.821 240.277a2.784 2.784 0 01-.039 3.879z" />
            <Path fill={ props.fill || '#000000' } d="M368.897 483.079h-44.493V398.16c0-37.738-30.703-68.44-68.442-68.44-37.738 0-68.441 30.702-68.441 68.44v84.919H96.248c-8.324 0-15.096-6.771-15.096-15.096V363.247c0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v104.736c0 16.595 13.501 30.096 30.096 30.096h272.649c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5zm-166.376-84.918c0-29.467 23.974-53.44 53.441-53.44s53.441 23.974 53.441 53.44v84.919H202.521z" />
        </Svg>
    )
};

export default HouseIcon;
