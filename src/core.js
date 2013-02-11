/*
 *  Copyright 2013 the original author or authors.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
di = {
    version: "0.1.0",
    createContext: function () {
        var ctx = {
            map: {}
        };

        ctx.register = function (name, type) {
            ctx.map[name] = new type();
        };

        ctx.find = function (name) {
            return ctx.map[name];
        };

        ctx.initialize = function () {
            var name;
            for (name in ctx.map) {
                var o = ctx.find(name);
                if (o.dependencies) {
                    var dependencyList = o.dependencies.split(" ");
                    dependencyList.forEach(function (dependencyName) {
                        var dependency = ctx.find(dependencyName);
                        o[dependencyName] = dependency;
                    });
                }
            }
        };

        return ctx;
    }
};