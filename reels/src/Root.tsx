import React from 'react';
import {Composition, registerRoot, staticFile} from 'remotion';
import {Reel, totalFrames} from './Reel';
import {plan} from './engine/planner';
import {ReelSpecSchema, type ReelSpec} from './engine/schema';
import {BRIEFS, DEMOS} from './samples';

const withStatic = (s: ReelSpec): ReelSpec => ({...s, media: s.media.map((m) => ({...m, src: m.src.startsWith('http') ? m.src : staticFile(m.src)}))});

const Root: React.FC = () => (
  <>
    {DEMOS.map((d) => {
      const spec = withStatic(plan({...BRIEFS[d.brief], themeId: d.themeId, durationSec: d.durationSec} as any));
      return <Composition key={`${d.brief}-${d.themeId}`} id={`${d.brief}-${d.themeId}`} component={Reel as any} durationInFrames={totalFrames(spec)} fps={30} width={1080} height={1920} defaultProps={spec as any} />;
    })}
    {/* Generic entry point for the render service: pass a validated ReelSpec as input props. */}
    <Composition
      id="Reel"
      component={Reel as any}
      schema={ReelSpecSchema as any}
      fps={30}
      width={1080}
      height={1920}
      durationInFrames={300}
      defaultProps={withStatic(plan({...BRIEFS.iraaya, themeId: 'quiet-luxury', durationSec: 30} as any)) as any}
      calculateMetadata={({props}) => ({durationInFrames: totalFrames(props as any)})}
    />
  </>
);

registerRoot(Root);
