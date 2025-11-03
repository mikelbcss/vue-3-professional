export interface Exercise {
  id: string
  title: string
  description: string
  mdxPath: string
}

export interface Section {
  id: string
  title: string
  mdxPath: string
  exercises: Exercise[]
}

export interface Module {
  id: string
  title: string
  description: string
  mdxPath: string
  sections: Section[]
  locked?: boolean
}

export interface CourseStructure {
  modules: Module[]
}
