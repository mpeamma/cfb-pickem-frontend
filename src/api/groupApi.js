import { get } from "./api";

export function getMyGroups(user) {
    return get("groups/mine", user)
}

export function getGroup(groupId, user) {
    return get(`groups/${groupId}`, user)
}