import React from 'react'
import { ExperimentCard, SectionHeader } from '../components'
import { experiments } from '../data/experiments'
import { useTranslate } from '../hooks/useTranslate'

const Experiments = () => {
  const translate = useTranslate()

  return (
    <div className="w-full flex flex-col">
      <SectionHeader
        title={translate('experiments_title')}
        icon="raphael:lab"
        subtitle={translate('experiments_subtitle')}
      />

      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
        {experiments.map(({description, name, tag, ...experiment}) => (
          <ExperimentCard
            name={translate(name as any)}
            description={translate(description as any)}
            tag={translate(tag as any)}
            {...experiment}
          />
        ))}
      </div>
    </div>
  )
}

export default Experiments