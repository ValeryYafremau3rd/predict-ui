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
    await fetch(import.meta.env.VITE_BASE_URL + `events/delete/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: userId
      }
    })
  ).json()
}

export async function getEvents(userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + 'events/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userId
      }
    })
  ).json()
}

export async function createUpdateEvent(eventId, eventName, lines, userId) {
  return (
    await fetch(
      import.meta.env.VITE_BASE_URL + `events/${!eventId ? 'create' : 'edit/' + eventId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: eventName,
          lines
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: userId
        }
      }
    )
  ).json()
}

export async function getEvent(id) {
  return (await fetch(import.meta.env.VITE_BASE_URL + `events/odd/${id}`)).json()
}

export async function getEventOperations() {
  return (await fetch(import.meta.env.VITE_BASE_URL + 'events/operations')).json()
}

export async function deleteGroup(groupId, userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + `group/delete/${groupId}`, {
      method: 'DELETE',
      headers: {
        Authorization: userId
      }
    })
  ).json()
}

export async function getGroups(userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + 'group/list', {
      headers: {
        Authorization: userId
      }
    })
  ).json()
}

export async function createUpdateGroup(groupId, groupName, selectedOdds, userId) {
  return (
    await fetch(
      import.meta.env.VITE_BASE_URL + `group/${!groupId ? 'create' : 'edit/' + groupId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: groupName,
          items: selectedOdds
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: userId
        }
      }
    )
  ).json()
}

export async function getGroup(id) {
  return (await fetch(import.meta.env.VITE_BASE_URL + `group/${id}`)).json()
}

export async function deletePredicted(id, userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + `predicted/delete/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id
      }),
      headers: {
        Authorization: userId,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  ).json()
}

export async function getPredicts(userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + 'predicted/list', {
      headers: {
        Authorization: userId
      }
    })
  ).json()
}

export async function getQueue(userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + 'queue/', {
      headers: {
        Authorization: userId
      }
    })
  ).json()
}

export async function deleteFromQueue(id, userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + `queue/delete/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        userId: userId,
        id
      }),
      headers: {
        Authorization: userId,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  ).json()
}

export async function addToQueue(homeTeam, awayTeam, groups, userId) {
  return (
    await fetch(import.meta.env.VITE_BASE_URL + 'queue/add', {
      method: 'POST',
      body: JSON.stringify({
        homeTeam,
        awayTeam,
        groups,
        status: 'queued'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: userId
      }
    })
  ).json()
}
