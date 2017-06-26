const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const $ = require('jQuery');
const TestUtils = require('react-addons-test-utils');

const Timer = require('Timer');

describe('Timer', () => {
    it('should exist', () => {
        expect(Timer).toExist();
    });
    describe('handleSetTimer', () => {
        it('should set state to started and count up', (done) => {
            var timer = TestUtils.renderIntoDocument(<Timer/>);
            timer.handleStatusChange('started');
            expect(timer.state.count).toBe(0);
            setTimeout(() => {
                expect(timer.state.timerStatus).toBe('started');
                expect(timer.state.count).toBe(1);
                done();
            }, 1001);
        });
        it('should pause timer on paused status', (done) => {
            var timer = TestUtils.renderIntoDocument(<Timer/>);
            timer.handleSetTimer(10);
            timer.handleStatusChange('started');
            timer.handleStatusChange('paused');
            setTimeout(() => {
                expect(timer.state.count).toBe(10);
                expect(timer.state.timerStatus).toBe('paused');
                done();
            }, 1001);
        });
        it('should reset count on stopped status', (done) => {
            var timer = TestUtils.renderIntoDocument(<Timer/>);
            timer.handleSetTimer(3);
            timer.handleStatusChange('started');
            timer.handleStatusChange('stopped');
            setTimeout(() => {
                expect(timer.state.count).toBe(0);
                expect(timer.state.timerStatus).toBe('stopped');
                done();
            }, 1001);
        });
    });
});