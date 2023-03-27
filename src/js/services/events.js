import {baseUrl,eventQuantity} from "../variables.js"


async function getEvents (userName){
    const response = await fetch(`${baseUrl}${userName}/events?per_page=${eventQuantity}`)
    const event = await response.json()

    const createAndPushEvent = event.filter((event) => {
        return event.type === "CreateEvent" || event.type === `PushEvent`;
    });
    return createAndPushEvent;
}

export { getEvents }