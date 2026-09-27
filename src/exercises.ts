export type CatalogExercise={id:string;name:string;aliases:string[];pattern:string;primary:string[];secondary:string[];equipment:string[];category:'strength'|'hypertrophy'|'power'|'body';load:'barbell'|'dumbbell'|'machine'|'cable'|'weighted_bodyweight'|'bodyweight'|'quality';increment:number;substitutes:string[]};
const X=(id:string,name:string,pattern:string,primary:string[],equipment:string[],category:CatalogExercise['category']='hypertrophy',load:CatalogExercise['load']='barbell',subs:string[]=[],aliases:string[]=[]):CatalogExercise=>({id,name,aliases,pattern,primary,secondary:[],equipment,category,load,increment:load==='barbell'||load==='weighted_bodyweight'?2.5:load==='dumbbell'?2:load==='machine'||load==='cable'?5:0,substitutes:subs});
export const EXERCISES:CatalogExercise[]=[
X('incline','Press inclinado con barra','horizontal_push',['upper_chest','triceps','anterior_deltoid'],['barbell','bench'],'strength','barbell',['incline_db','incline_machine','smith_incline']),
X('incline_db','Press inclinado con mancuernas','horizontal_push',['upper_chest','triceps'],['dumbbell','bench'],'hypertrophy','dumbbell',['incline','incline_machine']),
X('incline_machine','Press inclinado en máquina','horizontal_push',['upper_chest','triceps'],['machine'],'hypertrophy','machine',['incline_db','incline']),
X('smith_incline','Press inclinado Smith','horizontal_push',['upper_chest','triceps'],['smith','bench'],'hypertrophy','machine',['incline','incline_db']),
X('chestthrow','Lanzamiento de balón al pecho','horizontal_push_power',['chest','triceps'],['medicine_ball'],'power','quality'),
X('pullups','Dominadas','vertical_pull',['lats','biceps'],['pullup_bar'],'strength','bodyweight',['latpulldown']),
X('wpull','Dominada lastrada','vertical_pull',['lats','biceps'],['pullup_bar','weight'],'strength','weighted_bodyweight',['pullups','latpulldown']),
X('latpulldown','Jalón al pecho','vertical_pull',['lats','biceps'],['cable'],'hypertrophy','cable',['pullups','wpull']),
X('row1','Remo mancuerna a una mano','horizontal_pull',['lats','upper_back'],['dumbbell','bench'],'hypertrophy','dumbbell',['row2','chestrow']),
X('row2','Remo sentado','horizontal_pull',['lats','upper_back'],['cable'],'hypertrophy','cable',['row1','chestrow']),
X('chestrow','Remo con pecho apoyado','horizontal_pull',['upper_back','lats'],['dumbbell','bench'],'hypertrophy','dumbbell',['row1','row2']),
X('lateral1','Elevaciones laterales','shoulder_abduction',['lateral_deltoid'],['dumbbell'],'hypertrophy','dumbbell',['cable_lateral']),
X('lateral2','Elevaciones laterales','shoulder_abduction',['lateral_deltoid'],['dumbbell'],'hypertrophy','dumbbell',['cable_lateral']),
X('cable_lateral','Elevación lateral en polea','shoulder_abduction',['lateral_deltoid'],['cable'],'hypertrophy','cable',['lateral1']),
X('dips','Fondos','vertical_push',['chest','triceps'],['dip_bar'],'hypertrophy','bodyweight',['dbpress']),
X('dbpress','Press plano con mancuernas','horizontal_push',['chest','triceps'],['dumbbell','bench'],'hypertrophy','dumbbell',['incline_db']),
X('facepull','Face pull','horizontal_pull',['rear_deltoid','upper_back'],['cable'],'hypertrophy','cable'),
X('arms','Curl + tríceps','arms',['biceps','triceps'],['dumbbell','cable'],'hypertrophy','barbell'),
X('squat','Back squat','squat',['quads','glutes'],['barbell','rack'],'strength','barbell',['frontsquat','legpress','hacksquat']),
X('frontsquat','Front squat','squat',['quads','glutes'],['barbell','rack'],'strength','barbell',['squat','legpress']),
X('legpress','Prensa','squat',['quads','glutes'],['machine'],'hypertrophy','machine',['squat','frontsquat','hacksquat']),
X('hacksquat','Hack squat','squat',['quads','glutes'],['machine'],'hypertrophy','machine',['legpress','squat']),
X('boxjump','Box jump','jump',['quads','glutes'],['box'],'power','quality',['broad']),
X('rdl','Peso muerto rumano','hinge',['hamstrings','glutes'],['barbell'],'strength','barbell',['trap','hamcurl']),
X('bulgarian','Búlgara','single_leg',['quads','glutes'],['dumbbell','bench'],'hypertrophy','dumbbell',['lunges']),
X('calves','Elevación de gemelos','calf_raise',['calves'],['machine'],'hypertrophy','machine'),
X('abwheel','Ab wheel','anti_extension',['core'],['ab_wheel'],'body','bodyweight',['hanging']),
X('slam','Med-ball slam','upper_power',['core','lats','shoulders'],['medicine_ball'],'power','quality',['chestthrow']),
X('trap','Trap-bar deadlift','hinge',['glutes','hamstrings','quads'],['trap_bar'],'strength','barbell',['rdl']),
X('broad','Broad jump','jump',['glutes','quads'],[],'power','quality',['boxjump']),
X('lunges','Walking lunges','single_leg',['quads','glutes'],['dumbbell'],'hypertrophy','dumbbell',['bulgarian']),
X('hamcurl','Curl femoral','knee_flexion',['hamstrings'],['machine'],'hypertrophy','machine',['rdl']),
X('hanging','Elevación de piernas colgado','hip_flexion',['core'],['pullup_bar'],'body','bodyweight',['abwheel'])
];
export const byId=(id:string)=>EXERCISES.find(x=>x.id===id);
export const substitutesFor=(id:string)=>{const e=byId(id);return(e?.substitutes||[]).map(byId).filter(Boolean) as CatalogExercise[]};
