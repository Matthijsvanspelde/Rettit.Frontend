import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import { CommentForm } from './CommentForm';

jest.mock('axios');
const flushPromises = () => new Promise(setImmediate);
// const mock = new MockAdapter(axios);

describe('Comment Form', () => {
	const defaultProps = {
		postId: 1,
	};

	const wrapper = shallow(<CommentForm postId={defaultProps.postId} />);

	it('should render initially', () => {
		expect(wrapper.find('form')).toHaveLength(1);
		expect(wrapper.find('.form-control')).toHaveLength(1);
		expect(wrapper.find('.btn-primary')).toHaveLength(1);
	});

	it('handleSubmit success', () => {
		const mockedSuccessResponse = {
			subForumId: 1,
			title: 'test',
			message: 'test',
		};

		axios.post.mockImplementation(() => Promise.resolve(mockedSuccessResponse));
		const event = { preventDefault: jest.fn() };
		wrapper.instance().handleSubmit(event);

		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('handleSubmit failure', async () => {
		const mockedErrorResponse = {
			message: 'UnAuthorized',
		};

		axios.post.mockImplementation(() => Promise.reject(mockedErrorResponse));
		const event = { preventDefault: jest.fn() };
		wrapper.instance().handleSubmit(event);

		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('postCall Success', async () => {
		const mockedSuccessResponse = {
			subForumId: 1,
			title: 'test',
			message: 'test',
		};

		axios.post.mockImplementation(() => Promise.resolve(mockedSuccessResponse));
		const response = await wrapper.instance().postCall();

		expect(response).toEqual(mockedSuccessResponse);
	});

	it('postCall Failure', async () => {
		const mockedErrorResponse = {
			message: 'UnAuthorized',
		};

		axios.post.mockImplementation(() => Promise.reject(mockedErrorResponse));

		try {
			await wrapper.instance().postCall();
		} catch (err) {
			expect(err).toEqual(mockedErrorResponse);
		}
	});
});

