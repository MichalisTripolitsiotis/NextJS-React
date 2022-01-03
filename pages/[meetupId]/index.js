import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
    return (
        <MeetupDetail
            image="https://thessaloniki.travel/wp-content/uploads/2021/09/DJI_0402-min-scaled.jpg" alt="A first meetup"
            title="A first meetup"
            description="Meetup description"
            address="my address"
        />
    )
};

export default MeetupDetails;