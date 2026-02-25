using EmployeeManagmentAPI.Data;
using EmployeeManagmentAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagmentAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class EmployeeController : Controller
    {
        public readonly EmployeeDbContext employeeDbContext;

        public EmployeeController(EmployeeDbContext _employeeDbContext) 
        {
            employeeDbContext = _employeeDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await employeeDbContext.employees.ToListAsync();

            return Ok(employees);
        }


        [HttpGet]
        [Route("/api/[controller]/GetLogUser")]
        public async Task<IActionResult> GetLogUser([FromQuery] int idCard, [FromQuery] string password)
        {
            // [FromQuery] LogUser user

            //var employee = (object)null;

            //if (HelperEM.CheckLoginContent(user))
            //{
            //    employee = await employeeDbContext.employees.FirstOrDefaultAsync(x => x.IdCard == user.IdCard && x.Password.Equals(user.Password));

            //    if (employee == null)
            //    {
            //        return NotFound();
            //    }

            //}

            var employee = await employeeDbContext.employees.ToListAsync();
            Employee userilog = null;

            if (HelperEM.CheckLoginContent(new LogUser { IdCard = idCard, Password = password }))
            {
                foreach (var item in employee)
                {
                    if (item.IdCard == idCard && !(item.Password.Equals(password)))
                    {
                        userilog = item;
                        userilog.Password = null;
                    }else if (item.IdCard == idCard && (item.Password.Equals(password)))
                    {
                        userilog = item;
                    }
                }
            }

            return Ok(userilog);

        }

        [HttpGet]
        [Route("{loggIdCard:int}")]
        public async Task<IActionResult> GetReqUsers(int loggIdCard)
        {

            var employees = await employeeDbContext.employees.FirstOrDefaultAsync(x => x.IdCard == loggIdCard);

            if (employees == null)
            {
                return NotFound();
            }

            return Ok(employees);
        }




        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        {
            var employees = await employeeDbContext.employees.ToListAsync();
            var RegReqEmployees = await employeeDbContext.registerReqUsers.ToListAsync();

            if (HelperEM.CheckContent(employee))
            {
                foreach (var LoggedEmp in employees)
                {
                    if (employee.Email.Equals(LoggedEmp.Email) || employee.IdCard == LoggedEmp.IdCard)
                    {
                        return Conflict();
                    }
                }
                foreach (var RegReqEmp in RegReqEmployees)
                {
                    if (employee.Email.Equals(RegReqEmp.Email) || employee.IdCard == RegReqEmp.IdCard)
                    {
                        return Conflict();
                    }
                }
                await employeeDbContext.employees.AddAsync(employee);
                await employeeDbContext.SaveChangesAsync();

                return Ok(employee);
            }

            return BadRequest();
            
            
        }

        [HttpPut]
        [Route("{IdCard:int}")]
        public async Task<IActionResult> UpdateUser([FromRoute] int IdCard,Employee employee)
        {
            var User = await employeeDbContext.employees.FirstOrDefaultAsync(x=> x.IdCard == IdCard);
            
            if(User == null)
            {
                return NotFound();
            }

            User.Name = employee.Name;
            User.Surname = employee.Surname;
            User.Email = employee.Email;
            User.Password = employee.Password;
            User.PhoneNumber = employee.PhoneNumber;
            await employeeDbContext.SaveChangesAsync();

            return Ok();

        }

        [HttpDelete]
        [Route("{DelIdCard:int}")]
        public async Task<IActionResult> DeleteUser(int DelIdCard)
        {
            var employee = await employeeDbContext.employees.FirstOrDefaultAsync(x => x.IdCard == DelIdCard);

            if (employee == null)
            {
                return NotFound();
            }

            employeeDbContext.employees.Remove(employee);
            await employeeDbContext.SaveChangesAsync();
            return Ok();


        }






    }
}
