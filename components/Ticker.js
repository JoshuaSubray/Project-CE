import { useState, useEffect } from 'react';
import { Text, View, Animated, Easing, PanResponder } from 'react-native';

/*TODO:
make previousTable dynamic.
fix ticker loop.
*/

const Ticker = () => {
    const [rates, setRates] = useState([]);
    const [previousRates, setPreviousRates] = useState([]);
    const [scrollValue] = useState(new Animated.Value(0));
    const [panX, setPanX] = useState(new Animated.Value(0));
    const [gestureX, setGestureX] = useState(0);

    // fetch exchange rates.
    useEffect(() => {
        const fetchRates = async () => {
            try {
                // fetch currency exchange data.
                const response = await fetch(`https://api.nbp.pl/api/exchangerates/tables/A/?format=json`);
                const data = await response.json();

                // get latest table.
                const currentRates = data[0].rates;
                setRates(currentRates);

                // get previous table.
                // FIXME: currently isn't working.
                // const previousRates = data[1].rates;
                // setPreviousRates(previousRates);

                // get previous table data.
                const today = new Date();
                today.setDate(today.getDate() - 2);
                const yesterday = today.toISOString().split('T')[0];

                const previousResponse = await fetch(`https://api.nbp.pl/api/exchangerates/tables/A/${yesterday}/?format=json`);
                const previousData = await previousResponse.json();
                setPreviousRates(previousData[0].rates);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRates();
    }, []);

    // looping scroll animation.
    useEffect(() => {
        Animated.loop(
            Animated.timing(scrollValue, {
                toValue: 1,
                duration: 40000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rates, previousRates]); // refreshes when any value in this array changes.

    // assign each rate a status based on performance.
    const getStatus = (currentRate, previousRate) => {
        // if rate is invalid, mark it as.
        if (!currentRate || !previousRate || previousRate === 0) {
            return { status: 'N/A', color: 'gray' }
        }

        // calculate rate change.
        const change = currentRate - previousRate;
        const percentageChange = ((change / previousRate) * 100).toFixed(2);
        let color;

        if (change === 0) { // neutral change: yellow.
            color = 'yellow'
        } else if (change > 0) { // positive change: green.
            color = 'green';
        } else if (change < 0) { // negative change: red.
            color = 'red';
        }

        let status = `${percentageChange}%`;
        return { status, color };
    }

    // renders ticker with rates.
    const renderTicker = () => {
        return rates.map((rate) => {
            // find the previous rate for a currency.
            const previousRate = previousRates.find(r => r.code === rate.code)?.mid;
            const { status, color } = getStatus(rate.mid, previousRate);

            return (
                <View key={rate.code} style={{ flexDirection: 'row', marginRight: 20 }}>
                    <Text style={{ color, marginRight: 5 }}>
                        {`${status} ${rate.code}`}
                    </Text>
                </View>
            )
        })
    }

    // scrolling animation
    const scroll = scrollValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -2000],
    });

    // handles dragging ticker.
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            const newX = gestureState.dx + gestureX;
            panX.setValue(newX);
        },
        onPanResponderRelease: (e, gestureState) => {
            setGestureX(gestureX + gestureState.dx);
        }
    })

    return (
        <View style={{ flexDirection: 'row', overflow: 'hidden', marginVertical: 10 }}>
            <Animated.View
                style={{
                    backgroundColor: 'black',
                    paddingVertical: 5,
                    flexDirection: 'row',
                    transform: [{ translateX: Animated.add(scroll, panX) }],
                }}
                {...panResponder.panHandlers}
            >
                {renderTicker()}
            </Animated.View>
        </View>
    )
}

export default Ticker;