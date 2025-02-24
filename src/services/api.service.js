export async function getMatches(id) {
  return (await fetch(import.meta.env.VITE_BASE_URL + 'matches/' + id)).json()
}

export async function getMatch() {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + `match`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  ).json()
}

export async function getTeams(leagueId) {
  return (await fetch(import.meta.env.VITE_BASE_URL + `leagues/${leagueId}`)).json()
}

export async function getLeagues() {
  return (await fetch(import.meta.env.VITE_BASE_URL + 'leagues')).json()
}

export async function deleteEvent(eventId, userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + `builder/delete/${eventId}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId: userId })
    })
  ).json()
}

export async function getEvents(userId) {
  return (await fetch(import.meta.env.VITE_BASE_URL + 'builder/list/' + userId)).json()
}

export async function createUpdateEvent(eventId, eventName, lines, userId) {
  return (
    await fetch(
      import.meta.env.VITE_BASE_URL + `builder/${!eventId ? 'create' : 'edit/' + eventId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          name: eventName,
          lines
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
    )
  ).json()
}

export async function getEvent(id) {
  return (await fetch(import.meta.env.VITE_BASE_URL + `builder/odd/${id}`)).json()
}

export async function getEventOperations() {
  return (await fetch(import.meta.env.VITE_BASE_URL + 'builder/operations')).json()
}

export async function deleteGroup(groupId, userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + `builder/group/delete/${groupId}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId })
    })
  ).json()
}

export async function getGroups(userId) {
  return (await fetch(import.meta.env.VITE_BASE_URL + 'builder/group/list/' + userId)).json()
}

export async function createUpdateGroup(groupId, groupName, selectedOdds, userId) {
  return (
    await fetch(
      import.meta.env.VITE_BASE_URL + `builder/group/${!groupId ? 'create' : 'edit/' + groupId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          name: groupName,
          items: selectedOdds
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
    )
  ).json()
}

export async function getGroup(id) {
  return (await fetch(import.meta.env.VITE_BASE_URL + `builder/group/${id}`)).json()
}

export async function deletePredicted(id, userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + `delete_from_results/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        userId: userId,
        id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  ).json()
}

export async function getPredicts(userId) {
  return (await fetch(import.meta.env.VITE_BASE_URL + 'predicts/' + userId)).json()
}

export async function getQueue(userId) {
  return (await fetch(import.meta.env.VITE_BASE_URL + 'get_queue/' + userId)).json()
}

export async function deleteFromQueue(id, userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + `delete_from_queue/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        userId: userId,
        id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  ).json()
}

export async function addToQueue(homeTeam, awayTeam, groups, userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + 'queue/' + userId, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        homeTeam,
        awayTeam,
        groups,
        status: 'queued'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  ).json()
}
