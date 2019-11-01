import React, { useState, useContext, useEffect } from "react";
import EventCard from "../../../components/EventCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../components/CarousellCards.css";
import Axios from "axios";
import { Context } from "../../../contexts/UserProvider";
import { CONSOLE_LOGGING } from "../../../DevelopmentView";
import { Card, Container } from "semantic-ui-react";

const EventsSubscription = () => {

    const user = useContext(Context);

    const [allEvents, setAllEvents] = useState([]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        getAllEvents()
    }, []);

    const getAllEvents = () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        };
        Axios.get(
            "/api/events/gallery",
            { headers: headers }
        )
            .then(response => {
                CONSOLE_LOGGING && console.log("GET all events:", response);
                if (response.status === 200) {
                    setAllEvents(response.data);
                    setLoading(false);
                }
            })
            .catch(({ response }) => {
                CONSOLE_LOGGING && console.log("GET all events error:", response);
            });
    };

    const eventOne = {
        title: "Investment",
        desc:
            "For investors paying for each dollar of a company's earnings, the P/E ratio is a significant indicator, but the price-to-book ratio (P/B) is also a reliable indication of how much investors are willing to spend on each dollar of company assets. In the process of the P/B ratio, the share price of a stock is divided by its net assets; any intangibles, such as goodwill, are not taken into account. It is a crucial factor of the price-to-book ratio, due to it indicating the actual payment for tangible assets and not the more difficult valuation of intangibles. Accordingly, the P/B could be considered a comparatively conservative metric.",
        date: "Tues Night",
        location: "Dining Hall",
        image:
            "http://www.nusinvest.com/wp-content/uploads/2016/03/General-poster.jpg",
        categories: ["test", "cat"],
        eventId: "123",
        attending: false,
        attendees: 0
    };

    const eventTwo = {
        title: "Clubbing",
        desc: "party",
        date: "yesterday Night",
        location: "zouk Hall",
        image:
            "https://weezevent.com/wp-content/uploads/2019/01/12145054/organiser-soiree.jpg",
        categories: ["test", "cat"],
        eventId: "123",
        attending: false,
        attendees: 0
    };

    const eventThree = {
        title: "Reading",
        desc: "lets read togher",
        date: "tmr Night",
        location: "library hall Hall",
        image:
            "http://www.orlandonorthsports.com/assets/images/placeholders/placeholder-event.png",
        categories: ["test", "cat"],
        eventId: "123",
        attending: false,
        attendees: 0
    };


    if (isLoading) {
        return (
            <div>
                <Container>
                    <Card.Group centered="true">
                        <EventCard event={eventOne} />
                        <EventCard event={eventOne} />
                        <EventCard event={eventOne} />
                        <EventCard event={eventTwo} />
                        <EventCard event={eventOne} />
                        <EventCard event={eventOne} />
                        <EventCard event={eventThree} />
                        <EventCard event={eventOne} />
                    </Card.Group>
                </Container>
            </div>
        );

    }
    return (
        <div>
            <Container>
                <Card.Group centered="true">
                    {allEvents.map((value, index) => {
                        return <EventCard event={{
                            title: value.title,
                            desc: value.description,
                            date: value.eventDate,
                            location: value.venue,
                            image: "/ftp/" + value.posterPath,
                            categories: value.categories,
                            eventId: value.eventId,
                            attending: value.isUserAttendee,
                            attendees: value.attendees
                        }} />
                    })}
                </Card.Group>
            </Container>
        </div>
    );
};

export default EventsSubscription;