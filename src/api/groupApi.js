import { get } from "./api";

export function getMyGroups(user) {
    return get("http://localhost:5000/api/groups/mine", user)
}