import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}

/* import { User } from "../payload-types";
import  type { Access, CollectionConfig } from "payload";

const isAdminOrHasAccessToImages= (): Access => async ({
    req
}) => {

    if(!req.user) return false
    const user = req.user as User

    
    if (user.role === "admin") return true

    return {
        user: {
            equals: req.user.id
        }
    }
}

export const Media: CollectionConfig = {
    slug: "media",
    hooks: {
        beforeChange: [({req, data}) => {
            if(!req.user) return false
            return{...data, user: req.user.id}
        }]
    },
    admin: {
        hidden: ({user}) => user.role !== "admin"
    },
    access: {
        read: async ({req}) => {
            const referer = req.headers.referer
            if(!req.user || !referer?.includes("sell")) {
                return true
            }

            return await isAdminOrHasAccessToImages()({ req })
        }, 
        delete: isAdminOrHasAccessToImages(),
        update: isAdminOrHasAccessToImages()
    },
    upload: {
        staticURL: "/media",
        staticDir: "media",
        imageSizes: [
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "centre"
            },
            {
                name: "card",
                width: 768,
                height: 1024,
                position: "centre"
            },
            {
                name: "tablet",
                width: 1024,
                height: undefined,
                position: "centre"
            },
        ],
        mimeTypes: ["image/*"]
    },
    fields: [
        {name: "user",
    type: "relationship",
relationTo: "users",
required: true,
hasMany: false,
admin: {
    condition: () => false
}}
    ]
    
} */
