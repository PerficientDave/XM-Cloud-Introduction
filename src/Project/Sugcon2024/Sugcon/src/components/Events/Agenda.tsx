import React from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import useSWR from 'swr';

interface Fields {
  SessionizeUrl: Field<string>;
}

type AgendaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const AgendaDefaultComponent = (props: AgendaProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Agenda</span>
    </div>
  </div>
);

export const Default = (props: AgendaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  const fetcher = (url: string) => fetch(url).then((res) => res.text());
  const { data, error } = useSWR(
    props.fields.SessionizeUrl.value ? props.fields.SessionizeUrl.value : null,
    fetcher
  );

  if (!props?.fields?.SessionizeUrl?.value) {
    return <AgendaDefaultComponent {...props} />;
  }

  //TODO: design error
  if (error) {
    return <div>Failed to load...</div>;
  }

  //TODO: design loading
  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div className={`component agenda ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div dangerouslySetInnerHTML={{ __html: data as string }} />
      </div>
    </div>
  );
};
