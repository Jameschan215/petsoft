# Learn Next.js Notes

## `defaultValue` and `name` of an `<Input />`

1. If you use a `value` in an `<Input />`, you cannot modify the value. You have to use the `defaultValue` instead.

2. Don't forget to give your `<Input />` a name, otherwise, you cannot get the value of if with `formData`.

## Get data from form

```typeScript
const formData = new FormData(e.currentTarget);
  const newPet: Pet = {
    id: selectedPet.id,
    name: formData.get('name') as string,
    ownerName: formData.get('ownerName') as string,
    imageUrl:
      (formData.get('imageUrl') as string) || '...png',
    age: +(formData.get('age') as string),
    notes: formData.get('notes') as string,
};
```

## Use Prisma

1. Create TypeScript project and set up Prisma ORM
   As a first step, create a project directory and navigate into it:

```terminal
mkdir hello-prisma
cd hello-prisma
```

Next, initialize a TypeScript project using npm:

```terminal
npm init -y
npm install typescript ts-node @types/node --save-dev
```

## `useFormStatus`

`useFormStatus` is specifically designed to be used in Server Actions, which are components or functions that run on the server side with the `"use server"` directive.

## Things to learn

- Dialog of shadcn-ui
- flushSync()
