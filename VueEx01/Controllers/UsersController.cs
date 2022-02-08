using Microsoft.AspNetCore.Mvc;

namespace VueEx01.Controllers;

[Route("/api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    public IActionResult Get(string userId)
    {
        var result = new
        {
            firstName = $"{userId} Simon",
            lastName = "Wang"
        };
        return Ok(result);
    }
}