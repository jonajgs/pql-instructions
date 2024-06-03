import React, {
    createContext,
    lazy,
    Suspense,
    useCallback,
    useEffect,
    useReducer,
    useState
} from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {FieldError, SubmitHandler, useForm} from 'react-hook-form';
import Loading from './Loading';
import AvailableMembers from "./AvailableMembers.tsx";
import {useDispatch, useSelector} from "react-redux";
import { addTeam } from "../reducers/team";
import TeamService from "../services/TeamService";
import {Team} from "../models/Team.tsx";
import {Member} from "../models/Member.tsx";
import PlayerService from "../services/PlayerService";
import {useTranslation} from "react-i18next";

const Input = lazy(() => import('./Input.tsx'));

type InputsTeam = {
    name: string
    description?: string,
    players: number[]
}

const teamDefaultValues: InputsTeam = {
    name: '',
    description: '',
    players: []
};


type State = {
    members: number[];
};

type Action =
    | { type: 'ADD_MEMBERS'; payload: number[] }
    | { type: 'REMOVE_MEMBER'; id: number };


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_MEMBERS':
            return {
                ...state,
                members: [...state.members, ...action.payload],
            };
        case 'REMOVE_MEMBER':
            return {
                ...state,
                members: state.members.filter(
                    memberId => memberId !== action.id
                ),
            };
        default:
            return state;
    }
};

const initialState = {
    members: []
}

type ContextType = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

export const MembersContext = createContext<ContextType | null>(null);

const FormTeam = () => {
    const { t } = useTranslation();
    const [members, setMembers] = useState<Member[]>([]);
    const teams:Team[] = useSelector((state:any) => state.teams.value);
    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(reducer, initialState);
    const teamSchema = yup.object().shape({
        name: yup
            .string()
            .required(t('name_required'))
            .test('unique', t('name_unique'), (value: string) => {
                return teams.every(team => team.name !== value);
            }),
        description: yup.string(),
        players: yup.array().min(1, t('member_required')).required(),
    });
    const form = useForm({
        mode: 'onChange',
        defaultValues: teamDefaultValues,
        resolver: yupResolver(teamSchema),
    });

    useEffect(() => {
        form.setValue('players', state.members);
    }, [state.members]);

    const listPlayersFn = useCallback(() => {
        PlayerService
            .unassigned()
            .then(response => {
                setMembers(response);
            })
            .catch(err => {
                console.log('err', err);
            })
    }, [])

    useEffect(() => {
        listPlayersFn();
    }, []);

    const onSubmit: SubmitHandler<InputsTeam> = (body) => {
        TeamService.store(body).then(() => {
            dispatchRedux(addTeam(body))
            form.reset();
            listPlayersFn();
        }).catch(err => {
            console.log('err', err)
        })
    };


    return (
        <MembersContext.Provider value={{ state, dispatch }}>
            <div className="flex flex-col items-center w-[600px] mt-7">
                <div className="border-[1px] rounded-md overflow-hidden w-full">
                    <div className="bg-gray-100 p-3">
                        <p className="font-bold text-lg">{t('create_team')}</p>
                    </div>
                    <div>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-4 py-2">
                            <Input
                                label={t('teams_name')}
                                id="name"
                                form={form}
                                required
                                inputProps={{
                                    placeholder: "Slytherin"
                                }}
                            />
                            <Input
                                label={t('description')}
                                id="description"
                                form={form}
                                inputProps={{
                                    placeholder: t('describe_team')
                                }}
                            />

                            <Suspense fallback={<Loading/>}>
                                <AvailableMembers members={members}>
                                    {form.formState.errors.players && (
                                        <span className="text-xs text-red-400 font-bold">
                                        {(form.formState.errors.players as FieldError).message}
                                    </span>
                                    )}
                                </AvailableMembers>

                            </Suspense>

                            <input type="submit" className="p-2 bg-blue-500 font-bold text-white rounded-md"
                                   value={t('send')}/>
                        </form>
                    </div>
                </div>
            </div>
        </MembersContext.Provider>
    )
}

export default FormTeam;
