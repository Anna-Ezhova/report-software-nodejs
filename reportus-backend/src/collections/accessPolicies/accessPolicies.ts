import type { Access, CollectionBeforeChangeHook } from 'payload'

//Access policies for different user types.

//Features that can be used by admins or SOC only
export const Admin: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'admin') {
    return true
  } else {
    return false
  }
}

//Features that can be used by admins or SOC only
export const SocUserOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'user_soc' || user.role === 'manager_soc' || user.role === 'admin') {
    return true
  } else {
    return false
  }
}

export const SocManagerOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'manager_soc' || user.role === 'admin') {
    return true
  } else {
    return false
  }
}

//Features that can be used by SOC only
export const SocUserOnly: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'user_soc' || user.role === 'manager_soc') {
    return true
  } else {
    return false
  }
}

//Features that can be used by SOC only
export const SocAndService: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'user_soc' || user.role === 'manager_soc') {
    return true
  }

  return {
    id: {
      equals: user.id,
    },
  }
}

//Features that can be used by SOC only
export const SocServiceAdmin: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'user_soc' || user.role === 'manager_soc' || user.role === 'admin') {
    return true
  }

  return {
    id: {
      equals: user.id,
    },
  }
}

export const NotRegularUser: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'user_general') {
    return false
  } else return true
}

//Features that can be used by admins or "Verwaltung" only
export const ManagementandAdmin: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'admin' || user.role === 'manager_general') {
    return true
  } else return false
}

//Features that can be used by "Verwaltung"  only
export const ManagementOnly: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'manager_general') {
    return true
  } else return false
}

//Features that can be used by any SOC agent (including service accounts) NOTE: doesn't work!

export const SocAdminService: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'user_soc' || user.role === 'manager_soc') return true

  if (user.role === 'admin') return true

  if (user.role === 'service_account') return true
  return {
    id: {
      equals: user.id,
    },
  }
}

export const ServiceAccountOnly: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'service_account') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

export const allUsers: Access = ({ req: { user } }) => {
  if (!user) return false

  return true
}

export const addUser: CollectionBeforeChangeHook = async ({ req, data }) => {
  console.log(req)

  if (req.user) {
    const user = req.user

    return { ...data, user: user.id }
  }
}

export const addUserSoc: CollectionBeforeChangeHook = async ({ req, data }) => {
  if (req.user) {
    const user = req.user

    if (data.user_lvl1) {
      return { ...data, user_lvl2: user.id }
    } else {
      return { ...data, user_lvl1: user.id }
    }
  }
}

export const adminAndUser: Access = ({ req: { user }, id }) => {
  if (!user) return false

  if (user.role === 'admin') return true

  return user.id === id
}
