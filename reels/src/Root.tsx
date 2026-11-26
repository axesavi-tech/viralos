import React from 'react';
import {Composition, Still, registerRoot, staticFile} from 'remotion';
import {Reel, totalFrames} from './Reel';
import {plan} from './engine/planner';
import {ReelSpecSchema, type ReelSpec} from './engine/schema';
import {BRIEFS, DEMOS} from './samples';
import {PostSlide} from './posts/Post';
import {planPosts} from './posts/plan';
import {FORMAT_SIZE} from './posts/schema';

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
    {/* Generic post entry point: pass {spec: PostSpec, slide: number} as input props. */}
    <Still
      id="Post"
      component={PostSlide as any}
      width={1080}
      height={1350}
      defaultProps={{spec: withStatic(planPosts({...BRIEFS.iraaya, themeId: 'quiet-luxury', durationSec: 30} as any)[0] as any) as any, slide: 0} as any}
      calculateMetadata={({props}: any) => ({width: FORMAT_SIZE[props.spec.format as keyof typeof FORMAT_SIZE].w, height: FORMAT_SIZE[props.spec.format as keyof typeof FORMAT_SIZE].h})}
    />
  </>
);

registerRoot(Root);
